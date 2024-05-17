import { useState } from 'react'
import Metrics from './Metrics.js';
import Autosuggest from 'react-autosuggest'
import config from '../config.json';

const Country = () => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [typedValue, setTypedValue] = useState('');

  const getSuggestions = (prefix) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/api/countries?prefix=${prefix}`, {
        headers: {
          'X-Auth-Token': config.auth_token
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.errors){
          reject(data.errors)
        }else{
          resolve(data);
        }
      })
    });
  }

  const getSuggestionValue = (suggestion) => {
    return suggestion;
  }

  const onSuggestionsFetchRequested = ({value}) => {
    getSuggestions(value).then((suggestions) => {
      setSuggestions(suggestions);
    }).catch((err) => {
      // @todo Show error message
    })
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, value) => {
    handleSubmission(value.suggestion)
  }

  const handleSubmission = (countryName) => {
    fetch(`http://localhost:8080/api/metrics?country=${countryName}`, {
        headers: {
          'X-Auth-Token': config.auth_token
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.errors){
          setShowMetrics(false);
        }else{
          setShowMetrics(true);
          setMetrics(data)
        }
        
      }).catch((error) => {
        // @todo Show error message
      });
  }

  const renderSuggestion = suggestion => (
    <div className='suggestion'>
      {suggestion}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setTypedValue(newValue);
  }

  const inputProps = {
    placeholder: 'Country Name',
    value: typedValue,
    onChange: onChange
  };

  return (
    <div className="container">
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className="col-md-4">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        {showMetrics && <Metrics metrics={metrics} />}
      </div>
    </div>
  );
};

export default Country;