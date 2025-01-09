import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import { ApiRoutes } from '@/app/api/model/api-routes';
import { OfferMaximum } from '@/entities/offer-card';
import { FetchStatus } from '@/shared/model/enums';

import { setOffer, setOfferLoadingStatus } from '../actions';
import { DispatchStateExtra } from '../types';

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  'offer/fetch',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(FetchStatus.LOADING));

    const { status, data } = await api.get<OfferMaximum>(
      `${ApiRoutes.OFFERS}/${id}`,
    );

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoadingStatus(FetchStatus.FAILURE));
      return;
    }

    dispatch(setOfferLoadingStatus(FetchStatus.SUCCESS));
    dispatch(setOffer(data));
  },
);
