class PriceCalculator {
    static calculatePrice(baseDistance, totalDistance, kmPrice, fixPrice) {
      let totalPrice = fixPrice * 100;
      if (totalDistance > baseDistance) {
        totalPrice += (totalDistance - baseDistance) * kmPrice * 100;
      }
      return totalPrice / 100;
    }
  }
  
  module.exports = PriceCalculator;
  