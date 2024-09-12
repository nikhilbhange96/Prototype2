import { useState } from 'react'
import  './component/Home.css'

function App() {
  const [count, setCount] = useState(0)
  const [soilData, setSoilData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    rainfall: '',
    humidity: ''
  });

  const [recommendation, setRecommendation] = useState(null);

  // Handler for form input changes
  const handleChange = (e) => {
    setSoilData({ ...soilData, [e.target.name]: e.target.value });
  };

  // Function to recommend the crop and fertilizer based on soil parameters
  const recommendCropAndFertilizer = () => {
    const { nitrogen, phosphorus, potassium, ph, moisture, rainfall, humidity } = soilData;

    let crop = '';
    let fertilizer = '';

    // Basic logic to recommend based on soil parameters (this can be complex in reality)
    if (ph >= 6 && ph <= 7 && nitrogen > 50 && phosphorus > 30 && potassium > 40) {
      crop = 'Rice';
      fertilizer = 'Urea and DAP';
    } else if (ph < 6 && nitrogen < 50) {
      crop = 'Wheat';
      fertilizer = 'Ammonium Nitrate';
    } else if (ph > 7 && potassium > 50 && moisture > 50) {
      crop = 'Sugarcane';
      fertilizer = 'Muriate of Potash (MOP)';
    } else {
      crop = 'Maize';
      fertilizer = 'NPK 15-15-15';
    }

    setRecommendation({ crop, fertilizer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recommendCropAndFertilizer();
  };

  return (
    <>
     <div className="recommendation-container">
          <h2>Soil Data Input</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <label>
              Nitrogen (N):
              <input type="number" name="nitrogen" value={soilData.nitrogen} onChange={handleChange} required />
            </label>
            <label>
              Phosphorus (P):
              <input type="number" name="phosphorus" value={soilData.phosphorus} onChange={handleChange} required />
            </label>
            <label>
              Potassium (K):
              <input type="number" name="potassium" value={soilData.potassium} onChange={handleChange} required />
            </label>
            <label>
              pH of Soil:
              <input type="number" name="ph" step="0.1" value={soilData.ph} onChange={handleChange} required />
            </label>
            <label>
              Moisture (%):
              <input type="number" name="moisture" value={soilData.moisture} onChange={handleChange} required />
            </label>
            <label>
              Rainfall (mm):
              <input type="number" name="rainfall" value={soilData.rainfall} onChange={handleChange} required />
            </label>
            <label>
              Humidity (%):
              <input type="number" name="humidity" value={soilData.humidity} onChange={handleChange} required />
            </label>
            <button type="submit" className="submit-btn">Get Recommendation</button>
          </form>
    
          {recommendation && (
            <div className="recommendation-result">
              <h3>Recommended Crop: {recommendation.crop}</h3>
              <p>Recommended Fertilizer: {recommendation.fertilizer}</p>
            </div>
          )}
        </div>
    </>
  )
}

export default App
