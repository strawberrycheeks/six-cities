import { useAppSelector } from '@/app/store/model/hooks';
import { FavoriteOffersList } from '@/features/favorite-offers-list';
import { Footer } from '@/features/footer';
import { Header } from '@/features/header';

export const FavoritesPage = () => {
  const offers = useAppSelector((state) => state.offers);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteOffersList offers={offers} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
