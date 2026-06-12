import mongoose from 'mongoose'

export interface ISetting extends mongoose.Document {
  key: string
  value: string
  updatedAt: Date
}

const settingSchema = new mongoose.Schema<ISetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Setting ||
  mongoose.model<ISetting>('Setting', settingSchema)
