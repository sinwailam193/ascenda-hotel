function getHotelId(hotel) {
    return hotel.id || hotel.hotel_id || hotel.Id;
}

function getDestinationId(hotel) {
    return hotel.DestinationId || hotel.destination_id || hotel.destination;
}

function getHotelName(hotel) {
    return hotel.Name || hotel.name || hotel.hotel_name;
}

function getLatitude(hotel) {
    return hotel.Latitude || hotel.lat || '';
}

function getLongitude(hotel) {
    return hotel.Longitude || hotel.lng || '';
}

function getAddress(hotel) {
    if (hotel.location) {
        return hotel.location.address;
    }

    return hotel.Address || hotel.address;
}

function getCity(hotel) {
    return hotel.City || '';
}

function getCountry(hotel) {
    if (hotel.location) {
        return hotel.location.country;
    }
    return hotel.Country || '';
}

function getPostalCode(hotel) {
    return hotel.PostalCode || '';
}

function getDescription(hotel) {
    return hotel.Description || hotel.info || '';
}

function getAmenities(hotel) {
    if (hotel.amenities && !Array.isArray(hotel.amenities)) {
        const result = [];
        Object.keys(hotel.amenities).forEach(key => {
            result.push(...hotel.amenities[key]);
        });
        return result;
    }
    return hotel.amenities || hotel.Facilities;
}

function getBookConditions(hotel) {
    return hotel.booking_conditions || [];
}

function getImages(hotel) {
    if (!hotel.images) {
        return [];
    }
    const result = [];
    Object.keys(hotel.images).forEach(key => {
        hotel.images[key].forEach(image => {
            result.push({
                url: image.link || image.url,
                description: image.description || image.caption
            });
        });
    });

    return result;
}

module.exports = {
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
};
