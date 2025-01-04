import { layerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';

import { City } from '@/entities/city';

import { useMap } from '../lib/useMap';
import { Point } from '../model/types';
import { currentCustomIcon, defaultCustomIcon } from './map-icons';

type MapProps = {
  city: City;
  points: Point[];
  selectedPointId?: Point['id'];
};

export const Map = (props: MapProps) => {
  const { city, points, selectedPointId } = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPointId]);

  return (
    <section style={{ height: '500px', width: '650px' }} ref={mapRef}></section>
  );
};
