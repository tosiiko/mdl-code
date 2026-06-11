import { nextId } from "../utils/id.ts";
import type { Task } from "./model.ts";

export function seedTasks(): Task[] {
  const now = Date.now();

  return [
    {
      id: nextId("task"),
      title: "Document optional TypeScript scripts",
      notes: "Show that MDL owns the compiler and the site receives JavaScript.",
      priority: "high",
      status: "open",
      createdAt: now - 120_000,
    },
    {
      id: nextId("task"),
      title: "Serve compiled module URLs",
      notes: "The dev server should answer /scripts/app.js from scripts/app.ts.",
      priority: "normal",
      status: "done",
      createdAt: now - 60_000,
    },
    {
      id: nextId("task"),
      title: "Keep JavaScript support unchanged",
      notes: "Existing .js modules still copy and import normally.",
      priority: "low",
      status: "open",
      createdAt: now,
    },
  ];
}

export function scenarioTasks(): Task[] {
  return [
    {
      id: nextId("scenario"),
      title: "Design nested TypeScript folders",
      notes: "Split state, DOM, and utility code into separate files.",
      priority: "high",
      status: "open",
      createdAt: Date.now(),
    },
    {
      id: nextId("scenario"),
      title: "Verify import rewriting",
      notes: "Imports ending in .ts should become .js in the emitted modules.",
      priority: "normal",
      status: "open",
      createdAt: Date.now() + 1,
    },
    {
      id: nextId("scenario"),
      title: "Ship plain browser output",
      notes: "No TypeScript files are required in deployed output.",
      priority: "low",
      status: "done",
      createdAt: Date.now() + 2,
    },
  ];
}
