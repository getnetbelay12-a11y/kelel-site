import { NextResponse } from "next/server";

import { getAssetStatusData } from "@/lib/asset-status";

export async function GET() {
  const data = await getAssetStatusData();
  return NextResponse.json(data);
}
