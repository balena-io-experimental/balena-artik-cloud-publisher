(function() {
  'use strict';

  const ArtikCloudURL = process.env.ARTIKCLOUD_URL || 'https://api.samsungsami.io/v1.1';
  const device_token = process.env.ARTIKCLOUD_DEVICE_TOKEN || null; // Required
  const device_id = process.env.ARTIKCLOUD_DEVICE_ID || null; // Required
  const sensor_threshold = process.env.SENSOR_THRESHOLD || 2500;
  const poll_interval = process.env.POLL_INTERVAL || 1000; // Defaults to 0.25 second
  const device_name = process.env.DEVICE_NAME || 'wild-fire';

  var ArtikCloud = require('node-sami');
  var fs = require('fs');
  const exec = require('child_process').exec;

  const api = new ArtikCloud({
      baseUrl: ArtikCloudURL,
      token: device_token
  });

  enable_proximity_sensor();

  /*
  Function that enables and reads proximity sensor
  */
  function enable_proximity_sensor() {
    console.log('Monitoring for movement');

    setInterval(function() {
      getReading(function(reading){
        console.log('Sensor reading: ' + reading)
        if (reading > sensor_threshold) {
          console.log('pushing event to ARTIK Cloud');
          push2ArtikCloud(reading);
        }
      })
    }, poll_interval);
  }

  /*
  Pushes a message to SAMI
  */
  function push2ArtikCloud(reading) {

    if(device_token && device_id){
      api.messages.sendMessageAction(
          {
            'sdid': device_id,
            'ts': new Date().valueOf(),
            'type': 'message',
            'data': {
                'uuid': process.env.RESIN_DEVICE_UUID,
                'sensor': 'Proximity',
                'event': 'Movement',
                'name': device_name,
                'reading': reading
            }
      }, function(error, response) {
        if (error) console.log(error);
      });
    } else {
      console.log('Missing environment variable ARTIKCLOUD_DEVICE_TOKEN/ARTIKCLOUD_DEVICE_ID');
    }
  }

  /*
  Read from the proximity sensor or fall back to generated value
  */
  function getReading(cb){
    // got a sensor ?
    read_adc0(function(reading){
      if (reading != 0) {
        // sensor connected
        cb(reading)
      } else {
        // no sensor connected so generate a value
        cb(generateRandomVal(sensor_threshold))
      }
    });
  }

  /*
  Read from the proximity sensor
  */
  function read_adc0(cb) {
    cb(parseInt(fs.readFileSync(getArtikVersionADC())))
  }

  /*
  Randomly generates a number between 1 and 1.5x threshold
  */
  function generateRandomVal(max) {
    return Math.floor(Math.random() * (max*1.5));
  }

  /*
  returns the correct ADC path depending on the Artik Version
  */
  function getArtikVersionADC() {
    return (process.env.HOSTNAME.split('-')[0] === 'artik5') ? '/sys/devices/126c0000.adc/iio:device0/in_voltage0_raw':'/sys/devices/12d10000.adc/iio:device0/in_voltage0_raw';
  }

})();
