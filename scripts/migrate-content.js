require('dotenv').config()
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN, // You'll need to create a token with write access
  useCdn: false,
})

const migrateContent = async () => {
  try {
    // Find all documents without language field
    const documents = await client.fetch(
      `*[_type in ["page", "post", "home", "navigation", "gallery"] && !defined(language)]`
    )

    console.log(`Found ${documents.length} documents to migrate`)

    // Update each document with the default language
    for (const doc of documents) {
      await client
        .patch(doc._id)
        .set({ language: 'en' }) // Using 'en' as the default language
        .commit()
      console.log(`Updated document ${doc._id} with language en`)
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateContent() 