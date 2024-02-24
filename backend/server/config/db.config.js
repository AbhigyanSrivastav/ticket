import mongoose from 'mongoose';

const dbConnect = () => {
  // Retrieve connection string from your environment variables
  const dbURI = process.env.MONGO_URI; 

  mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
   })
   .then(() => console.log('Database connected'))
   .catch(err => console.error('DB Connection error', err));
};

export default dbConnect;
