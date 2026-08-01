"use client";

import { useEffect, useRef, useState } from "react";
import { MarkerClusterer, type Renderer } from "@googlemaps/markerclusterer";
import type { PublicMappedProject } from "@/lib/mapped-projects";
import { trackEvent } from "@/lib/analytics";
import styles from "./ProjectMapSection.module.css";

let mapsPromise: Promise<void> | null = null;

declare global {
  interface Window {
    __hepburnMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window.google?.maps?.importLibrary === "function") return Promise.resolve();
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Google Maps timed out")), 15_000);
    const fail = () => {
      window.clearTimeout(timeout);
      mapsPromise = null;
      reject(new Error("Google Maps could not load"));
    };

    window.__hepburnMapsReady = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    window.gm_authFailure = fail;

    const script = document.createElement("script");
    const parameters = new URLSearchParams({
      key: apiKey,
      loading: "async",
      callback: "__hepburnMapsReady",
      v: "weekly",
      language: "en",
      region: "GB",
      auth_referrer_policy: "origin",
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${parameters.toString()}`;
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });

  return mapsPromise;
}

function makePin(label?: string, cluster = false) {
  const pin = document.createElement("div");
  pin.className = cluster ? styles.clusterPin : styles.mapPin;
  if (label) pin.textContent = label;
  return pin;
}

function makeInfoWindow(project: PublicMappedProject) {
  const card = document.createElement("article");
  card.className = styles.infoCard;

  if (project.imageUrl) {
    const image = document.createElement("img");
    image.src = project.imageUrl;
    image.alt = project.imageAlt || project.title;
    image.width = 320;
    image.height = 190;
    card.appendChild(image);
  }

  const copy = document.createElement("div");
  const meta = document.createElement("small");
  meta.textContent = `${project.locationLabel} · ${project.projectType}`;
  const title = document.createElement("h3");
  title.textContent = project.title;
  copy.append(meta, title);

  if (project.description) {
    const description = document.createElement("p");
    description.textContent = project.description;
    copy.appendChild(description);
  }
  if (project.projectUrl) {
    const link = document.createElement("a");
    link.href = project.projectUrl;
    link.textContent = "View Project ↗";
    link.addEventListener("click", () => trackEvent("project_map_view_project", { map_item_id: project.id }));
    copy.appendChild(link);
  }
  card.appendChild(copy);
  return card;
}

export function GoogleProjectMap({
  projects,
  apiKey,
  mapId,
}: {
  projects: PublicMappedProject[];
  apiKey?: string;
  mapId?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(!apiKey);
  const hasCoordinates = projects.some(
    (project) => typeof project.latitude === "number" && typeof project.longitude === "number"
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !apiKey) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShouldLoad(true),
      { rootMargin: "300px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [apiKey]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !shouldLoad || !apiKey) return;
    let cancelled = false;
    let clusterer: MarkerClusterer | undefined;
    const markers: google.maps.marker.AdvancedMarkerElement[] = [];

    async function initialise() {
      try {
        await loadGoogleMaps(apiKey!);
        const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
          google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
          google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
        ]);
        if (cancelled || !host) return;

        const mappable = projects.filter(
          (project) => typeof project.latitude === "number" && typeof project.longitude === "number"
        );
        const map = new Map(host, {
          center: { lat: 52.486, lng: -1.89 },
          zoom: 8,
          mapId: mapId || "DEMO_MAP_ID",
          gestureHandling: "cooperative",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          clickableIcons: false,
        });
        const bounds = new google.maps.LatLngBounds();
        const info = new InfoWindow({ maxWidth: 340 });

        for (const project of mappable) {
          const position = { lat: project.latitude!, lng: project.longitude! };
          const marker = new AdvancedMarkerElement({
            position,
            title: `${project.title}, ${project.locationLabel}`,
            content: makePin(),
            gmpClickable: true,
          });
          marker.addEventListener("gmp-click", () => {
            info.setContent(makeInfoWindow(project));
            info.open({ map, anchor: marker });
            trackEvent("project_map_marker_opened", { map_item_id: project.id, source_type: project.sourceType });
          });
          markers.push(marker);
          bounds.extend(position);
        }

        if (markers.length >= 6) {
          const renderer: Renderer = {
            render: ({ count, position }) => new AdvancedMarkerElement({
              position,
              content: makePin(String(count), true),
              title: `${count} projects in this area`,
            }),
          };
          clusterer = new MarkerClusterer({ map, markers, renderer });
        } else {
          markers.forEach((marker) => { marker.map = map; });
        }

        if (markers.length > 1) map.fitBounds(bounds, 54);
        else if (markers.length === 1) {
          map.setCenter({ lat: mappable[0].latitude!, lng: mappable[0].longitude! });
          map.setZoom(11);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    initialise();
    return () => {
      cancelled = true;
      clusterer?.clearMarkers();
      markers.forEach((marker) => { marker.map = null; });
      host.replaceChildren();
    };
  }, [apiKey, mapId, projects, shouldLoad]);

  if (failed || !hasCoordinates) {
    return (
      <div className={styles.mapFallback} role="status">
        <span>Interactive map unavailable</span>
        <p>The project list and location filters are still available below.</p>
      </div>
    );
  }

  return (
    <div className={styles.mapFrame} aria-label="Interactive map of Hepburn Architects projects">
      <div ref={hostRef} className={styles.mapCanvas} />
      {!shouldLoad && <div className={styles.mapLoading}>Map loads as you approach this section.</div>}
    </div>
  );
}
