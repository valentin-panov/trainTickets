import { ITrain } from '../../../interfaces/Interfaces';

export const trainsList: ITrain[][] = [
  [
    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      min_price: 875,
      available_seats: 189,
      available_seats_info: {
        second: 32,
        third: 96,
        fourth: 62,
      },
      departure: {
        _id: 9522,
        have_first_class: false,
        have_second_class: true,
        have_third_class: true,
        have_fourth_class: true,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: false,
        min_price: 875,
        duration: 62160,
        available_seats: 189,
        available_seats_info: {
          second: 32,
          third: 96,
          fourth: 62,
        },
        train: {
          _id: 1280,
          name: 'Брусника - 9',
        },
        from: {
          railway_station_name: 'Белорусский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1617161185,
        },
        to: {
          railway_station_name: 'Ладожский',
          city: {
            _id: 1492,
            name: 'санкт-петербург',
          },
          datetime: 1617223345,
        },
        price_info: {
          second: {
            top_price: 1857,
            bottom_price: 1623,
          },
          third: {
            top_price: 3215,
            bottom_price: 3755,
            side_price: 3035,
          },
          fourth: {
            top_price: 875,
            bottom_price: 955,
          },
        },
      },
    },

    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      min_price: 1845,
      available_seats: 81,
      available_seats_info: {
        first: 18,
        second: 64,
      },
      departure: {
        _id: 8696,
        have_first_class: true,
        have_second_class: true,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: false,
        min_price: 1845,
        duration: 196140,
        available_seats: 81,
        available_seats_info: {
          first: 18,
          second: 64,
        },
        train: {
          _id: 1156,
          name: 'Иволга - 35',
        },
        from: {
          railway_station_name: 'Московский',
          city: {
            _id: 1492,
            name: 'санкт-петербург',
          },
          datetime: 1616900834,
        },
        to: {
          railway_station_name: 'Киевский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1617096974,
        },
        price_info: {
          first: {
            price: 3360,
            top_price: 3840,
            bottom_price: 2785,
          },
          second: {
            top_price: 2352,
            bottom_price: 1845,
          },
        },
      },
    },
  ],
  [
    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: true,
      min_price: 1845,
      available_seats: 81,
      available_seats_info: {
        first: 18,
        second: 64,
      },
      departure: {
        _id: 8696,
        have_first_class: true,
        have_second_class: true,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: true,
        min_price: 1845,
        duration: 196140,
        available_seats: 81,
        available_seats_info: {
          first: 18,
          second: 64,
        },
        train: {
          _id: 1156,
          name: 'Иволга - 35',
        },
        from: {
          railway_station_name: 'Московский',
          city: {
            _id: 1492,
            name: 'санкт-петербург',
          },
          datetime: 1616900834,
        },
        to: {
          railway_station_name: 'Киевский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1617096974,
        },
        price_info: {
          first: {
            price: 3360,
            top_price: 3840,
            bottom_price: 2785,
          },
          second: {
            top_price: 2352,
            bottom_price: 1845,
          },
        },
      },
    },
    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      min_price: 1638,
      available_seats: 129,
      available_seats_info: {
        first: 18,
        second: 64,
        third: 48,
      },
      departure: {
        _id: 6398,
        have_first_class: true,
        have_second_class: true,
        have_third_class: true,
        have_fourth_class: false,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: false,
        min_price: 1638,
        duration: 221340,
        available_seats: 129,
        available_seats_info: {
          first: 18,
          second: 64,
          third: 48,
        },
        train: {
          _id: 1397,
          name: 'Перун - 87',
        },
        from: {
          railway_station_name: 'Московский',
          city: {
            _id: 1492,
            name: 'нижний новгород',
          },
          datetime: 1616772581,
        },
        to: {
          railway_station_name: 'Ярославский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1616993921,
        },
        price_info: {
          first: {
            price: 2520,
            top_price: 3110,
            bottom_price: 4555,
          },
          second: {
            top_price: 1731,
            bottom_price: 1638,
          },
          third: {
            top_price: 2910,
            bottom_price: 3350,
            side_price: 2775,
          },
        },
      },
    },
  ],
  [
    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      min_price: 2505,
      available_seats: 79,
      available_seats_info: {
        second: 32,
        third: 48,
      },
      departure: {
        _id: 7515,
        have_first_class: false,
        have_second_class: true,
        have_third_class: true,
        have_fourth_class: false,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: false,
        min_price: 2505,
        duration: 261060,
        available_seats: 79,
        available_seats_info: {
          second: 32,
          third: 48,
        },
        train: {
          _id: 1132,
          name: 'Иволга - 16',
        },
        from: {
          railway_station_name: 'Киевский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1616946237,
        },
        to: {
          railway_station_name: 'Ладожский',
          city: {
            _id: 1492,
            name: 'санкт-петербург',
          },
          datetime: 1617207297,
        },
        price_info: {
          second: {
            top_price: 2820,
            bottom_price: 2505,
          },
          third: {
            top_price: 3360,
            bottom_price: 4670,
            side_price: 3555,
          },
        },
      },
    },
  ],
  [
    {
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_air_conditioning: false,
      is_express: false,
      min_price: 1638,
      available_seats: 129,
      available_seats_info: {
        first: 18,
        second: 64,
        third: 48,
      },
      departure: {
        _id: 6398,
        have_first_class: true,
        have_second_class: true,
        have_third_class: true,
        have_fourth_class: false,
        have_wifi: true,
        have_air_conditioning: true,
        is_express: false,
        min_price: 1638,
        duration: 221340,
        available_seats: 129,
        available_seats_info: {
          first: 18,
          second: 64,
          third: 48,
        },
        train: {
          _id: 1397,
          name: 'Перун - 87',
        },
        from: {
          railway_station_name: 'Московский',
          city: {
            _id: 1492,
            name: 'нижний новгород',
          },
          datetime: 1616772581,
        },
        to: {
          railway_station_name: 'Ярославский',
          city: {
            _id: 1491,
            name: 'москва',
          },
          datetime: 1616993921,
        },
        price_info: {
          first: {
            price: 2520,
            top_price: 3110,
            bottom_price: 4555,
          },
          second: {
            top_price: 1731,
            bottom_price: 1638,
          },
          third: {
            top_price: 2910,
            bottom_price: 3350,
            side_price: 2775,
          },
        },
      },
    },
  ],
];
