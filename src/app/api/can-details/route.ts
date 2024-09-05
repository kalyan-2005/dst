import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';

export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url);
  const can = searchParams.get('can'); // Get the dynamic CAN number from the query

  if (!can) {
    return NextResponse.json({ error: 'CAN number is required' });
  }

  const url = `https://erp.hyderabadwater.gov.in/HmwssbOnlineNew/api/HmwssbMCCCaptureGrievance/GetServConnDetailsForCAN?can=${can}`;
  
  try {
    const response = await fetch(url);
    const xmlData = await response.text();

    // If the response is in XML, you can parse it using xml2js (uncomment if needed):
    // const parser = new xml2js.Parser();
    // const result = await parser.parseStringPromise(xmlData);

    const result = JSON.parse(xmlData); // Or use JSON.parse if the response is JSON

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch or parse data' });
  }
}
