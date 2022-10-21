/* eslint-disable camelcase */

import { ReactElement } from 'react';

export interface IStatus {
  status: 'idle' | 'pending' | 'success' | 'error';
  error: string;
}

export interface IMenu {
  id: number;
  title: string;
  pathName: string;
}

export interface ICity {
  _id: number;
  value: string;
}

export interface LastTickets extends IStatus {
  items: ITrain[];
}

export interface IGetRouteData {
  total_count: number;
  items: ITrain[];
}

export interface IGetRoute extends IStatus {
  data: {
    totalCount: number;
    items: ITrain[][];
  };
}

export interface DestOptions extends IStatus {
  items: ICity[];
}

export interface IFilterItem {
  [index: string]: {
    element: ReactElement;
    title: string;
  };
}

export interface IServices {
  have_wifi: boolean;
  is_express: boolean;
  have_air_conditioning: boolean;
}

export interface ITrain {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: ISeatsSpectre;
  departure: {
    _id: number;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    duration: number;
    available_seats: number;
    available_seats_info: ISeatsSpectre;
    train: {
      _id: number;
      name: string;
    };
    from: {
      railway_station_name: string;
      city: {
        _id: number;
        name: string;
      };
      datetime: number;
    };
    to: {
      railway_station_name: string;
      city: {
        _id: number;
        name: string;
      };
      datetime: number;
    };
    price_info: IPriceInfo;
  };
}

export interface IPriceInfo {
  first?: {
    price: number;
    top_price?: number;
    bottom_price?: number;
  };
  second?: {
    top_price: number;
    bottom_price: number;
  };
  third?: {
    top_price: number;
    bottom_price: number;
    side_price: number;
  };
  fourth?: {
    top_price: number;
    bottom_price: number;
  };
}

export interface ISeatsSpectre {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface ISortOption {
  value: string;
  label: string;
}

export type ISortOptions = ISortOption[];

// export carriageType sortVariants = 'date' | 'price_min' | 'duration';

export interface ISearchParams {
  cityDeparture: ICity;
  cityArrival: ICity;
  dateOutbound: string | null;
  dateReturn: string | null;
  filters: IFilters;
  limit: number;
  sort: string;
  offset: number;
}

export interface IFilters {
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  is_express?: boolean;
  have_air_conditioning?: boolean;
  price_from?: number;
  price_to?: number;
  start_departure_hour_from?: number;
  start_departure_hour_to?: number;
  start_arrival_hour_from?: number;
  start_arrival_hour_to?: number;
  end_departure_hour_from?: number;
  end_departure_hour_to?: number;
  end_arrival_hour_from?: number;
  end_arrival_hour_to?: number;
}

export interface ISeatsQuery {
  id: number;
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  have_air_conditioning?: boolean;
  have_express?: boolean;
}

export interface ISeatAvailability {
  index: number;
  available: boolean;
}

export interface ISeatsResponse {
  _id: number;
  name: string;
  class_type: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price?: number; // Цена за место (Люкс)
  top_price?: number; // Цена верхнего места
  bottom_price?: number; // Цена нижнего места
  side_price?: number; // Цена бокового места
  linens_price?: number; // Цена постельного белья
  wifi_price?: number; // Цена услуги Wi-Fi
  avaliable_seats?: number; // Количество свободных мест в вагоне
  is_linens_included?: number; // Стоимость белья включена в стоимость билета и не может быть исключена (true/false)
  seats: ISeatAvailability[];
}

export interface ISeatsState extends IStatus {
  data: ISeatsResponse;
}

export interface ISeat {
  index: number;
  available: boolean;
}

export interface ICoach {
  coach: {
    _id: number;
    name: string;
    class_type: string;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    price?: number;
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
    linens_price: number;
    wifi_price: number;
    is_linens_included: boolean;
    available_seats: number;
    train: number;
  };
  seats: ISeat[];
}

export interface ITrainSeatsData extends IStatus {
  items: ICoach[];
}

export interface IService {
  isSelected: boolean;
  price: number;
}

export interface ISelectedSeat {
  route_direction_id: string;
  price: string;
  coach_id: string;
  seat_number: string;
  is_child: boolean;
  include_children_seat: boolean;
}

export interface IPersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: 'Паспорт' | 'Свидетельство о рождениии';
  document_data: string;
}

export interface IOrderSeat {
  price: string;
  coach_id: string;
  seat_number: string;
  person_info?: IPersonInfo;
  is_child?: boolean;
  include_children_seat?: boolean;
}

export interface IPersonalData {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: 'cash' | 'online';
}

export interface IOrder extends IStatus {
  user?: IPersonalData;
  departure: {
    route_direction_id: string;
    seats: IOrderSeat[];
  };
}
