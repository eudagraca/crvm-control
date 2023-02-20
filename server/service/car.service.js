const { QueryTypes, Op } = require("sequelize");
const { dbConnection } = require("../config/db");
const { Car, Category, Supply } = require("../models");

exports.getAllCars = async (registration, limit) => {
  let cars = [];

  if (registration) {
    cars = Car.findAll({
      where: {
        registration: { [Op.iLike]: `%${registration}%` },
      },
      limit: limit,
      include: [{ model: Category }, { model: Supply }],
    });
  } else {
    cars = Car.findAll({
      limit: limit,
      include: [{ model: Category }, { model: Supply }],
    });
  }
  return cars;
};

exports.getAllCarWithSupplies = async (registration, limit) => {
  let allCars = [];

  let cars = [];
  if (registration) {
    cars = await dbConnection.query(
      'SELECT *FROM (SELECT "cars".*, "category"."id" AS "category_id", "category"."name" AS "category_name", "category"."description" AS "category_description", "category"."createdAt" AS "category_createdAt", "category"."updatedAt" AS "category_updatedAt", "supplies"."id" AS "supplies_id", "supplies"."primavera_id" AS "supplies_primavera_id", "supplies"."km_before" AS "supplies_km_before", "supplies"."km_actual" AS "supplies_km_actual", "supplies"."km_traveled" AS "supplies_km_traveled", "supplies"."liters_supplied" AS "supplies_liters_supplied", "supplies"."value_supplied" AS "supplies_value_supplied", "supplies"."liters_spent" AS "supplies_liters_spent", "supplies"."requestor" AS "supplies_requestor", "supplies"."requested_date" AS "supplies_requested_date", "supplies"."car_id" AS "supplies_car_id", "supplies"."createdAt" AS "supplies_createdAt", "supplies"."updatedAt" AS "supplies_updatedAt", ROW_NUMBER () OVER (PARTITION BY "cars"."registration" ORDER BY "supplies"."createdAt" DESC) AS "supplies_rank" FROM (SELECT "cars"."id", "cars"."registration", "cars"."engine", "cars"."maximum", "cars"."km_of_insertion", "cars"."category_id", "cars"."createdAt", "cars"."updatedAt" FROM "cars" AS "cars" WHERE UPPER("cars"."registration") LIKE :search_name LIMIT :row_limit) AS "cars" LEFT OUTER JOIN "categories" AS "category" ON "cars"."category_id" = "category"."id" LEFT OUTER JOIN "supplies" AS "supplies" ON "cars"."id" = "supplies"."car_id" ) q_all WHERE "supplies_rank" = 1 ',
      {
        replacements: {
          search_name: "%" + registration.toUpperCase() + "%",
          row_limit: limit,
        },
        raw: true,
        type: QueryTypes.SELECT,
        //   mapToModel: true,
        //   model: [Car],
      }
    );
  } else {
    cars = await dbConnection.query(
      'SELECT "cars".*, "category"."id" AS "category_id", "category"."name" AS "category_name", "category"."description" AS "category_description", "category"."createdAt" AS "category_createdAt", "category"."updatedAt" AS "category_updatedAt", "supplies"."id" AS "supplies_id", "supplies"."primavera_id" AS "supplies_primavera_id", "supplies"."km_before" AS "supplies_km_before", "supplies"."km_actual" AS "supplies_km_actual", "supplies"."km_traveled" AS "supplies_km_traveled", "supplies"."liters_supplied" AS "supplies_liters_supplied", "supplies"."value_supplied" AS "supplies_value_supplied", "supplies"."liters_spent" AS "supplies_liters_spent", "supplies"."requestor" AS "supplies_requestor", "supplies"."requested_date" AS "supplies_requested_date", "supplies"."car_id" AS "supplies_car_id", "supplies"."createdAt" AS "supplies_createdAt", "supplies"."updatedAt" AS "supplies_updatedAt", ROW_NUMBER () OVER (PARTITION BY "cars"."registration" ORDER BY "supplies"."createdAt" DESC) AS "supplies_rank" FROM (SELECT "cars"."id", "cars"."registration", "cars"."engine", "cars"."maximum", "cars"."km_of_insertion", "cars"."category_id", "cars"."createdAt", "cars"."updatedAt" FROM "cars" AS "cars" LIMIT 10) AS "cars" LEFT OUTER JOIN "categories" AS "category" ON "cars"."category_id" = "category"."id" LEFT OUTER JOIN "supplies" AS "supplies" ON "cars"."id" = "supplies"."car_id"',
      {
        type: QueryTypes.SELECT,
        //   mapToModel: true,
        //   model: [Car],
      }
    );
  }
  cars.forEach((e) => {
    const car = {
      id: e["id"],
      registration: e["registration"],
      engine: e["engine"],
      maximum: e["maximum"],
      km_of_insertion: e["km_of_insertion"],
      category_id: e["category_id"],
      createdAt: e["createdAt"],
      updatedAt: e["updatedAt"],
      category: {
        id: e["category_id"],
        name: e["category_name"],
        description: e["category_description"],
        createdAt: e["category_createdAt"],
        updatedAt: e["category_updatedAt"],
      },
    };

    const supplies = [];

    if (e["supplies_id"]) {
      supplies.push({
        id: e["supplies_id"],
        primavera_id: e["supplies_primavera_id"],
        km_before: e["supplies_km_before"],
        km_actual: e["supplies_km_actual"],
        km_traveled: e["supplies_km_traveled"],
        liters_supplied: e["supplies_liters_supplied"],
        value_supplied: e["supplies_value_supplied"],
        liters_spent: e["supplies_liters_spent"],
        requestor: e["supplies_requestor"],
        requested_date: e["supplies_requested_date"],
        car_id: e["supplies_car_id"],
        createdAt: e["supplies_createdAt"],
        updatedAt: e["supplies_updatedAt"],
        rank: e["supplies_rank"],
      });
    }
    car.supplies = supplies;

    allCars.push(car);
  });

  return allCars;
};
