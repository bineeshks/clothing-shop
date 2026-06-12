'use client'

import { useEffect, useState } from 'react'
import { AdminNav } from '@/components/admin/admin-nav'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings as SettingsIcon, Save, Check } from 'lucide-react'

interface SettingField {
  key: string
  label: string
  placeholder: string
  type?: string
  description?: string
}

const SETTING_FIELDS: SettingField[] = [
  {
    key: 'whatsappNumber',
    label: 'WhatsApp Business Number',
    placeholder: '+919000000000',
    type: 'tel',
    description:
      'Include country code. Customers will contact you via this number.',
  },
  {
    key: 'storeName',
    label: 'Store Name',
    placeholder: 'Vellora',
    description: 'Display name for your store.',
  },
  {
    key: 'storeEmail',
    label: 'Store Email',
    placeholder: 'hello@vellora.com',
    type: 'email',
    description: 'Contact email shown to customers.',
  },
  {
    key: 'storePhone',
    label: 'Store Phone',
    placeholder: '+251 912 345 678',
    type: 'tel',
    description: 'Phone number displayed in footer.',
  },
  {
    key: 'storeAddress',
    label: 'Store Address',
    placeholder: 'Addis Ababa, Ethiopia',
    description: 'Physical location shown to customers.',
  },
  {
    key: 'instagramUrl',
    label: 'Instagram URL',
    placeholder: 'https://instagram.com/vellora',
    description: 'Your Instagram profile link.',
  },
  {
    key: 'facebookUrl',
    label: 'Facebook URL',
    placeholder: 'https://facebook.com/vellora',
    description: 'Your Facebook page link.',
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(data.settings || {})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (key: string) => {
    setSaving(key)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: settings[key] || '' }),
      })
      setSavedKeys(prev => new Set([...prev, key]))
      setTimeout(() => {
        setSavedKeys(prev => {
          const next = new Set(prev)
          next.delete(key)
          return next
        })
      }, 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(null)
    }
  }

  const handleSaveAll = async () => {
    setSaving('all')
    try {
      await Promise.all(
        SETTING_FIELDS.map(field =>
          fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: field.key,
              value: settings[field.key] || '',
            }),
          })
        )
      )
      const allKeys = new Set(SETTING_FIELDS.map(f => f.key))
      setSavedKeys(allKeys)
      setTimeout(() => setSavedKeys(new Set()), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold">Store Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your store details and integrations
            </p>
          </div>
          <Button
            onClick={handleSaveAll}
            disabled={saving === 'all' || loading}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            {saving === 'all' ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save All
              </>
            )}
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading settings...
          </div>
        ) : (
          <div className="space-y-4">
            {SETTING_FIELDS.map(field => (
              <Card key={field.key} className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">
                      {field.label}
                    </label>
                    {field.description && (
                      <p className="text-xs text-muted-foreground mb-2">
                        {field.description}
                      </p>
                    )}
                    <Input
                      type={field.type || 'text'}
                      value={settings[field.key] || ''}
                      onChange={e =>
                        setSettings(prev => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                    />
                  </div>
                  <Button
                    onClick={() => handleSave(field.key)}
                    disabled={saving === field.key}
                    variant="outline"
                    size="sm"
                    className="mt-7 flex-shrink-0 gap-1"
                  >
                    {savedKeys.has(field.key) ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Saved
                      </>
                    ) : saving === field.key ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}

            {/* Note */}
            <Card className="p-5 bg-muted/50">
              <div className="flex items-start gap-3">
                <SettingsIcon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    WhatsApp Number Note
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The WhatsApp number is also used for the "Order on WhatsApp"
                    and "Enquire on WhatsApp" buttons on all product pages. Set
                    <code className="mx-1 px-1 bg-muted rounded text-xs">
                      NEXT_PUBLIC_WHATSAPP_NUMBER
                    </code>
                    in your .env file for a build-time fallback.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
