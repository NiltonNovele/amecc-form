import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db("amecc"); // your DB name
    const collection = db.collection("submissions");

    const result = await collection.insertOne(data);

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
