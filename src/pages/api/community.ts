import { SiteClient } from 'datocms-client';

export default async function communtyRequest(request, response) {
  if (request.method === 'POST') {
    const { title, image_url, creator_slug } = request.body;

    const TOKEN = process.env.NEXT_PUBLIC_API_FULL_COMMUNITY;
  
    const client = new SiteClient(TOKEN);
  
    const community = await client.items.create({
      itemType: '972796',
      title,
      image_url,
      creator_slug,
    });

    response.json({community})
    return;    
  }

  response.json({ message: 'Wrong method' })

}