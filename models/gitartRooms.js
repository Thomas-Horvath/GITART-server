const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  size: { type: String }, // Csak akkor szükséges, ha az adott equipment mérete releváns (pl. snare, bass_drum).
  power: { type: String }, // Csak akkor szükséges, ha az adott equipment teljesítménye releváns (pl. amp, pa_system).
  description: { type: String, required: true }
});

const DrumSchema = new Schema({
  snare: EquipmentSchema,
  bass_drum: EquipmentSchema,
  cymbals: {
    brand: { type: String, required: true },
    models: [{ type: String, required: true }],
    description: { type: String, required: true }
  }
});

const RoomSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  price_per_hour: { type: Number, required: true },
  equipment: {
    drums: DrumSchema,
    guitar_amp: EquipmentSchema,
    bass_amp: EquipmentSchema,
    keyboard: EquipmentSchema, // Csak akkor szükséges, ha van billentyűzet az adott teremben.
    microphones: {
      brand: { type: String, required: true },
      models: [{ type: String, required: true }],
      description: { type: String, required: true }
    },
    pa_system: EquipmentSchema
  },
  description: { type: String, required: true }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
