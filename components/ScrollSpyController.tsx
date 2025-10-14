"use client";

import useScrollSpy from "@/hooks/useScrollSpy";

export default function ScrollSpyController({ ids, offset = 120 }: { ids: string[]; offset?: number }) {
  useScrollSpy(ids, offset);
  return null;
}


