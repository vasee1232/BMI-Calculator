import React, { useState, useEffect  } from "react";
import FormInput from "./Forminput";
import  PropTypes  from "prop-types";

const BmiCalculator = props => {
 const { getBmiValue } = props;

  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setweightUnit] = useState("kg");
  const [Unit, setUnit] = useState("metric");
  const [count, setCount] = useState( 
   //input onChange second method
    /*{ data:{
    heightCount:'0',
    weightCount:'0',
    indchesCount:'0'}
  }*/

  //first method
   {
    heightCount:'0',
    weightCount:'0',
    inchesCount:'0',
  }
    ); 
    const {heightCount, inchesCount, weightCount} = count /*.data*/; 

//setting the default values to imperial by using use effect hook
 /* useEffect(() => {
    if (Unit === "") setUnit("metric");
    setHeightUnit("cm");
    setweightUnit("kg");
  });*/

  useEffect(() => {
    metricBmi(heightCount, weightCount)
    imperialBmi(heightCount, weightCount, inchesCount)

    //eslint-disable-next-line
  },[heightCount, weightCount, inchesCount]);

  const onChangeInput = e => {
   const {name,value} = e.target;
   setCount(prevState => ({...prevState, [name]:value}));
   //second ochange method
   /*const {data} = count;
   setCount({
    data: {
      ...data,
      [name]: value
    }
   });*/
  };

  const onSelectTag = (e) => {
    setUnit(e.target.value);
    if (e.target.value === "metric") {
      setHeightUnit("cm");
      setweightUnit("kg");
    } else {
      setHeightUnit("ft");
      setweightUnit("lbs");
    }
  };

  const metricBmi = (height, weight) => {
    if(height > 0 && weight > 0) {
      const heightToMeter = height / 100;
      //formula for metric
      const bmi = weight / (heightToMeter * heightToMeter);
      getBmiValue(Math.round(bmi));
    }
  }

  const imperialBmi = (height, weight, inches) => {
    if (height > 0 && weight > 0 && inches > 0) {
      //12 inch make a foot 
      //convert feet to inches
      //add it to inches value
      const heightToInches = (height * 12) + parseInt(inches);
      //formula for imperial
      const bmi = 703 * (weight / (heightToInches * heightToInches));
      getBmiValue(Math.round(bmi));
    }
  }

  const resetData = e =>{
    e.preventDefault()

    getBmiValue('0');
    setUnit('Metric');
    setCount(  {
      heightCount:'0',
      weightCount:'0',
      inchesCount:'0',
    });
       setHeightUnit("cm");
       setweightUnit("kg");
  };

  return (
    <>
      <div className='bmi-inputs'>
        <div className='input-fields'>
          <div>
            <span className='label-unit'>Unit</span>
            <div className='unit'>
              <select
                name='unit'
                value={Unit}
                onChange={onSelectTag}
                className='form-control form-control-sm'
              >
                <option value='metric'>Metric</option>
                <option value='imperial'>Imperial</option>
              </select>
            </div>
          </div>
          <FormInput
            type='text'
            name='heightCount'
            title={`Height (${heightUnit})`}
            value={heightCount}
            onChange={onChangeInput}
          />
          {Unit === "imperial" ? (
            <FormInput
              type='text'
              name='inchesCount'
              title={`(in)`}
              value={inchesCount}
              onChange={onChangeInput}
            />
          ) : (
            ""
          )}
          <FormInput
            type='text'
            name='weightCount'
            title={`Weight (${weightUnit})`}
            value={weightCount}
            onChange={onChangeInput}
          />
        </div>
        <button className='button' type='submit' onClick={resetData}>
          Reset
        </button>
      </div>
    </>
  );
};

BmiCalculator.propTypes = {
  getBmiValue: PropTypes.func.isRequired
}

export default BmiCalculator;
