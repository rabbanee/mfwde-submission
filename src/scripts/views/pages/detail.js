import UrlParser from '../../routes/url-parser';
import RestaurantAppsSource from '../../data/restaurantapps-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import RestaurantDetailInitiator from '../../utils/restaurant-detail-initiator';
import ConsumerReviewHelper from '../../utils/consumer-review-helper';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  showSwal() {
    return import(/* webpackPrefetch: true */ 'sweetalert2').then(({ default: Swal }) => {
      localStorage.setItem('sent', false);
      Swal.fire({
        title: 'Success',
        html: '<p aria-label="Your review has been saved">Your review has been saved</p>',
        icon: 'success',
        confirmButtonAriaLabel: 'Ok',
      });
    }).catch(() => 'An error occurred while loading the component');
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantAppsSource.detailRestaurant(url.id);
    if (localStorage.getItem('sent') === 'true') {
      this.showSwal();
    }

    RestaurantDetailInitiator.init({
      restaurantDetailContainer: document.querySelector('#restaurant'),
      restaurant,
    });

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: restaurant.restaurant,
    });

    ConsumerReviewHelper.init({
      restaurant,
    });
  },
};

export default detail;
