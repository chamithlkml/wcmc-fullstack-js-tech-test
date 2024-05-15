import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import Metrics from './Metrics.js';

const Country = () => {
  const [countryName, setCountryName] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState({});

  const handleChange = (event) => {
    setCountryName(event.target.value);
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/metrics?country=${countryName}`, {
        headers: {
          'X-Auth-Token': 'SECRET12345'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setShowMetrics(true);
        setMetrics(data)
      })
  }

  return (
    <div className="container">
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className="col-md-4">
          <Form onSubmit={handleSubmission}>
            <Form.Group className="mb-3" controlId="countryName">
              <Form.Label>Enter Country Name</Form.Label>
              <Form.Control type="text" placeholder="Country Name" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className="col-md-4">
          {showMetrics && <Metrics metrics={metrics} />}
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
};

export default Country;