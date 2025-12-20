import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("Utils", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      const result = cn("px-2 py-1", "px-4");
      expect(result).toBe("py-1 px-4");
    });

    it("handles empty strings", () => {
      const result = cn("px-2", "");
      expect(result).toBe("px-2");
    });

    it("handles multiple classes with conflicts", () => {
      const result = cn("text-red-500", "text-blue-500");
      expect(result).toContain("text-blue-500");
      expect(result).not.toContain("text-red-500");
    });

    it("handles conditional classes", () => {
      const isActive: boolean = true;
      const result = cn(isActive && "bg-blue-500", "px-2");
      expect(result).toContain("bg-blue-500");
      expect(result).toContain("px-2");
    });

    it("handles array input", () => {
      const result = cn(["px-2", "py-1"], "bg-white");
      expect(result).toContain("px-2");
      expect(result).toContain("py-1");
      expect(result).toContain("bg-white");
    });
  });
});
