const axios = require('axios');

const {
    getHotelId,
    getDestinationId,
    getHotelName,
    getLatitude,
    getLongitude,
    getAddress,
    getCity,
    getCountry,
    getPostalCode,
    getDescription,
    getAmenities,
    getBookConditions,
    getImages
} = require('../utils/util');

const SUPPLIERS = [
    'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme',
    'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia',
    'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies'
];

async function getHotels(req, res) {
    const destinationId = parseInt(req.query.destinationId, 10) || '';
    const hotelIds = req.query.hotelIds || [];

    let result = {};
    try {
        const promises = SUPPLIERS.map(url => axios.get(url)
            .then(response => response.data));
        const results = await Promise.all(promises);
        results.forEach(res => {
            res.forEach(hotel => {
                const id = getHotelId(hotel);

                // filter based on hotel ids first if hotels are passed in
                if (!!hotelIds.length && !hotelIds.includes(id)) {
                    return;
                }

                // filter based on destination id if destination is passed in
                if (!!destinationId && getDestinationId(hotel) !== destinationId) {
                    return;
                }

                // if result has not been recorded yet, we will initizlize the result
                if (!result[id]) {
                    result[id] = {
                        id,
                        destinationId: getDestinationId(hotel),
                        hotelName: getHotelName(hotel),
                        latitude: getLatitude(hotel),
                        longitude: getLongitude(hotel),
                        address: getAddress(hotel),
                        city: getCity(hotel),
                        country: getCountry(hotel),
                        postalCode: getPostalCode(hotel),
                        description: getDescription(hotel),
                        amenities: getAmenities(hotel),
                        bookingCondition: getBookConditions(hotel),
                        images: getImages(hotel)
                    };
                } else {
                    // results already been recorded, we will update areas that we may have missed from previous API
                    const existingObj = result[id];
                    existingObj.hotelName = existingObj.hotelName || getHotelName(hotel);
                    existingObj.latitude = existingObj.latitude || getLatitude(hotel);
                    existingObj.longitude = existingObj.longitude || getLongitude(hotel);
                    existingObj.address = existingObj.address || getAddress(hotel);
                    existingObj.city = existingObj.city || getCity(hotel);
                    existingObj.country = existingObj.country || getCountry(hotel);
                    existingObj.postalCode = existingObj.postalCode || getPostalCode(hotel);
                    existingObj.description = existingObj.description || getDescription(hotel);
                    existingObj.amenities = !existingObj.amenities.length ? getAmenities(hotel) : existingObj.amenities;
                    existingObj.bookingCondition = !existingObj.bookingCondition.length ? getBookConditions(hotel) : existingObj.bookingCondition;
                    existingObj.images = !existingObj.images.length ? getImages(hotel) : existingObj.images;
                }
            });
        });

    } catch (err) {
        console.error(err.toString());
        res.status(500).send('Internal server error');
        return;
    }

    res.json(Object.values(result))
}

module.exports = {
    getHotels
};
