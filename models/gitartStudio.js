const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  channels: { type: String }, // Csak akkor szükséges, ha az adott equipment csatornákat tartalmaz (pl. keverőpult, hangkártya).
  power: { type: String }, // Csak akkor szükséges, ha az adott equipment teljesítménye releváns (pl. stúdió monitor).
  description: { type: String, required: true }
});

const MicrophonesSchema = new Schema({
  brand: { type: String, required: true },
  models: [{ type: String, required: true }],
  description: { type: String, required: true }
});

const DawSchema = new Schema({
  software: { type: String, required: true },
  version: { type: String, required: true },
  description: { type: String, required: true }
});

const StudioSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  price_per_hour: { type: Number, required: true },
  equipment: {
    mixing_console: EquipmentSchema,
    studio_monitors: EquipmentSchema,
    microphones: MicrophonesSchema,
    audio_interface: EquipmentSchema,
    daw: DawSchema
  },
  description: { type: String, required: true }
});


/*
  itt meg kell adni 3. paraméternek hogy milyen collection nevet akarok használni
  mert a mongoose alapból többásszámba rakná és létrehozna egy új studios collectiont!!!!

  Ebben a példában az első paraméter ('studio') a modell neve, a második (StudioSchema) a séma,
  a harmadik paraméter ('studio') pedig az adatbázisban használt gyűjtemény neve.
  Így biztosíthatod, hogy a studio nevű gyűjtemény legyen használva az adatbázisban,
  és ne hozza létre automatikusan a studios gyűjteményt.
*/ 


const Studio = mongoose.model('studio', StudioSchema, 'studio');

module.exports = Studio;
