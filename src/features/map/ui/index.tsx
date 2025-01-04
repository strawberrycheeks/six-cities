import { useEffect, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';

import { City } from '@/entities/city';
import { Point } from '../model/types';
import { useMap } from '../lib/useMap';
import { currentCustomIcon, defaultCustomIcon } from './MapIcons';

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
          lat: point.latitude,
          lng: point.longitude,
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
