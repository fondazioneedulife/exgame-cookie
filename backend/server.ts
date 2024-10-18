import mongoose, { Document, Schema } from 'mongoose';

// Definire un'interfaccia per il documento utente (user)
interface IUser extends Document {
  name: string;
  email: string;
  age: number;
}

// Definire lo schema dell'utente con mongoose
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
});

// Creare il modello dell'utente
const User = mongoose.model<IUser>('User', UserSchema);

// Connettersi a MongoDB
const mongoUrl: string = 'mongodb://localhost:27017/School'; // Cambia con il nome del tuo database

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connessione al database MongoDB riuscita');

    // // Creare un nuovo utente
    // const newUser = new User({
    //   name: 'Mario Rossi',
    //   email: 'mario.rossi@example.com',
    //   age: 30
    // });

    // Salvare il nuovo utente nel database
    // newUser.save()
    //   .then(() => console.log('Nuovo utente salvato'))
    //   .catch((error) => console.error('Errore durante il salvataggio:', error));

    // Leggere tutti gli utenti
    User.find()
      .then((users) => console.log(users))
      .catch((error) => console.error('Errore durante la lettura:', error));
  })
  .catch((error) => console.error('Errore di connessione a MongoDB:', error));