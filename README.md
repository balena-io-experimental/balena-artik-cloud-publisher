# balena Artik Cloud Publisher
balena application to showcase an Artik-10 or 5 pushing Infrared Proximity Sensor (Sharp GP2Y0A21YK) to the ARTIK Cloud.

## Getting Started

* Ensure you have [git](https://git-scm.com/) installed on your computer.
* [Get your Artik set up with balena](http://docs.balena.io/artik5/nodejs/gettingstarted/)

### Infrared Proximity Sensor

Connect the sensor as shown below:

![wiring](/docs/wiring.png)

### ARTIK Cloud
  * You need a Samsung account and a device created in the [ARTIK Cloud](https://portal.samsungsami.io) dashboard
  * You need to create a new device type [here](https://devportal.samsungsami.io/#/devicetypes/new)
    * __Manifest__ - Upload [device_manifest.json](https://github.com/balena-playground/balena-artik10-demo/blob/master/device_manifest.json) from this repository. ![manifest](/docs/manifest.png)
  * You need to sign into the [user portal](https://portal.samsungsami.io/) and connect a device using the device type name you created earlier.
  * Select the gear icon on your new device and then generate a token.
  ![token](/docs/token.png)

## Configuration

### ENV config
  Set these environment variables in your balena applications dashboard.
  * `ARTIKCLOUD_URL` => __*string (optional)*__ ( defaults to `https://api.samsungsami.io/v1.1/messages` ) the ARTIKCLOUD endpoint
  * `ARTIKCLOUD_DEVICE_TOKEN` => __*string (required)*__ The Device ID set in the ARTIKCLOUD dashboard
  * `ARTIKCLOUD_DEVICE_ID` => __*string (required)*__ The Device token generated in the ARTIKCLOUD dashboard
  * `SENSOR_THRESHOLD` => __*string (optional)*__ The ADC threshold to activate the sensor
  * `POLL_INTERVAL` => __*number (optional)*__ Time in milliseconds to poll the sharp sensor
  * `DEVICE_NAME` => __*string (optional)*__ The Device name to send to ARTIKCLOUD

### Push this repo to your Artik

```
git clone https://github.com/balena-projects/balena-artik-cloud-publisher && cd balena-artik-cloud-publisher
```

```
git remote add balena git@git.balena:myGithubName/balenaAppName.git
```

```
git push balena master
```

Check balena & Artik dashboard.

![image](docs/artik-dash.gif)
