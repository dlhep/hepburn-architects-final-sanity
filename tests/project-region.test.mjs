import assert from "node:assert/strict";
import test from "node:test";
import { isNorthEastProject, isMidlandsWebsiteProject, northEastProjectSlugs } from "../lib/project-region.ts";

test("the four migrated case studies stay off the Midlands site even without location metadata", () => {
  assert.equal(northEastProjectSlugs.length, 4);
  for (const slug of northEastProjectSlugs) assert.equal(isMidlandsWebsiteProject({ slug }), false);
});

test("North East regions, locations and postcodes are excluded", () => {
  for (const project of [
    { websiteRegion: "North East" }, { websiteRegion: "North-East" },
    { location: "North Yorkshire" }, { location: "Newcastle upon Tyne" },
    { townOrCity: "Stockton-on-Tees" }, { location: "County Durham" },
    { postcode: "TS7 0PD" }, { postcode: "NE1 1AA" },
  ]) assert.equal(isNorthEastProject(project), true, JSON.stringify(project));
});

test("Midlands locations and unrelated wider UK projects remain visible", () => {
  for (const location of ["Birmingham", "Harborne", "Solihull", "Newcastle-under-Lyme", "Newcastle, Staffordshire", "Stockton, Warwickshire", "Cornwall", "Yorkshire"]) {
    assert.equal(isMidlandsWebsiteProject({ location }), true, location);
  }
  assert.equal(isMidlandsWebsiteProject({ postcode: "B15 3AA" }), true);
  assert.equal(isMidlandsWebsiteProject({ location: null }), true);
});
