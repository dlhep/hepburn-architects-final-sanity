import OpenAI from "openai";
import { NextResponse } from "next/server";
import { hepburnAssistantInstructions } from "@/lib/chat/hepburn-context";
import { checkChatRateLimit } from "@/lib/chat/rate-limit";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIdentifier(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { code: "INVALID_ORIGIN", message: "This request could not be verified." },
      { status: 403 },
    );
  }

  if (!checkChatRateLimit(clientIdentifier(request))) {
    return NextResponse.json(
      { code: "RATE_LIMITED", message: "Please wait a few minutes before asking another question." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  try {
    const body = await request.json();
    if (!Array.isArray(body?.messages)) throw new Error("INVALID_INPUT");

    const messages: ChatMessage[] = body.messages.slice(-8).map((item: unknown) => {
      const value = item as Partial<ChatMessage>;
      if (
        (value.role !== "user" && value.role !== "assistant") ||
        typeof value.content !== "string" ||
        !value.content.trim() ||
        (value.role === "user" && value.content.length > 1_000)
      ) {
        throw new Error("INVALID_INPUT");
      }
      return { role: value.role, content: value.content.trim().slice(0, 2_000) };
    });

    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!latestUserMessage) throw new Error("INVALID_INPUT");

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_CHAT_MODEL;
    if (!apiKey || !model) {
      return NextResponse.json(
        {
          code: "AI_NOT_CONFIGURED",
          message: "Live answers are unavailable, but the guided project options are still available.",
        },
        { status: 503 },
      );
    }

    const client = new OpenAI({ apiKey });
    const moderation = await client.moderations.create({
      model: "omni-moderation-latest",
      input: latestUserMessage.content,
    });
    if (moderation.results[0]?.flagged) {
      return NextResponse.json(
        {
          code: "MESSAGE_NOT_ACCEPTED",
          message: "I can’t respond to that message. Please ask a general question about your residential project.",
        },
        { status: 400 },
      );
    }

    const response = await client.responses.create({
      model,
      instructions: hepburnAssistantInstructions,
      input: messages,
      max_output_tokens: 220,
      store: false,
    });

    const answer = response.output_text.trim();
    if (!answer) throw new Error("EMPTY_RESPONSE");
    return NextResponse.json({ answer });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_INPUT") {
      return NextResponse.json(
        { code: "INVALID_INPUT", message: "Please enter a shorter project question and try again." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        code: "AI_UNAVAILABLE",
        message: "A live answer is unavailable just now. Please use a guided option or contact the practice.",
      },
      { status: 502 },
    );
  }
}
