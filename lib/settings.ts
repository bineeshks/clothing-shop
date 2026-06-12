import connectDB from '@/lib/db'
import Setting from '@/lib/models/Settings'

const DEFAULT_WHATSAPP = process.env.WHATSAPP_NUMBER || '+919000000000'

export async function getSetting(key: string, fallback = ''): Promise<string> {
  try {
    await connectDB()
    const setting = await Setting.findOne({ key })
    return setting?.value ?? fallback
  } catch {
    return fallback
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await connectDB()
  await Setting.findOneAndUpdate(
    { key },
    { key, value },
    { upsert: true, new: true }
  )
}

export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    await connectDB()
    const settings = await Setting.find({})
    return settings.reduce(
      (acc, s) => {
        acc[s.key] = s.value
        return acc
      },
      {} as Record<string, string>
    )
  } catch {
    return {}
  }
}

export async function getWhatsAppNumber(): Promise<string> {
  return getSetting('whatsappNumber', DEFAULT_WHATSAPP)
}
