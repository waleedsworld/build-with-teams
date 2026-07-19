import { describe, it, expect } from "vitest";
import { jobListings, getJobById } from "./jobListings";

describe("jobListings data integrity", () => {
  it("contains at least one listing", () => {
    expect(jobListings.length).toBeGreaterThan(0);
  });

  it("gives every listing the required fields", () => {
    for (const job of jobListings) {
      expect(job.id).toBeTruthy();
      expect(job.title).toBeTruthy();
      expect(Array.isArray(job.requirements)).toBe(true);
      expect(Array.isArray(job.responsibilities)).toBe(true);
      expect(typeof job.taasDescription).toBe("string");
      expect(typeof job.note).toBe("string");
    }
  });

  it("has unique ids across all listings", () => {
    const ids = jobListings.map((j) => j.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getJobById", () => {
  it("returns the matching listing for a known id", () => {
    const first = jobListings[0];
    expect(getJobById(first.id)).toBe(first);
  });

  it("resolves every listed id", () => {
    for (const job of jobListings) {
      expect(getJobById(job.id)?.id).toBe(job.id);
    }
  });

  it("returns undefined for an unknown id", () => {
    expect(getJobById("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for an empty id", () => {
    expect(getJobById("")).toBeUndefined();
  });
});
