export default class Clima {
    id
    name
    latitude
    longitude
    elevation
    feature_code
    country_code
    admin1_id
    admin2_id
    timezone
    population
    country_id
    country
    admin1
    admin2

    constructor() {
    this.id = "";
    this.name = "";
    this.latitude = 0;
    this.longitude = 0;
    this.elevation = 0;
    this.feature_code = "";
    this.country_code = "";
    this.admin1_id = 0;
    this.admin2_id = 0;
    this.timezone = "";
    this.population = 0;
    this.country_id = 0;
    this.country = "";
    this.admin1 = "";
    this.admin2 = "";

    // objetos aninhados
    this.current_units = {};
    this.current = {};
    this.daily_units = {};
    this.daily = {};
    }
  //   current_units {
  //     time
  //     interval
  //     weather_code
  //     temperature_2m
  //     relative_humidity_2m
  //     apparent_temperature
  //     is_day
  //     wind_speed_10m
  //     wind_direction_10m
  //     wind_gusts_10m
  //     precipitation
  //     rain
  //     showers
  //     snowfall
  //     cloud_cover
  //     pressure_msl
  //     surface_pressure
  //   }
  //   current {
  //     time
  //     interval
  //     weather_code
  //     temperature_2m
  //     relative_humidity_2m
  //     apparent_temperature
  //     is_day,
  //     wind_speed_10m
  //     wind_direction_10m
  //     wind_gusts_10m
  //     precipitation
  //     rain
  //     showers
  //     snowfall
  //     cloud_cover
  //     pressure_msl
  //     surface_pressure
  //       }
  //   daily_units {
  //     time
  //     weather_code
  //     temperature_2m_max
  //     temperature_2m_min
  //   }
  //   daily {
  //     time
  //     weather_code
  //     temperature_2m_max
  //     temperature_2m_min
  //   }
}
