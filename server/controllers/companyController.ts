import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../helpers/middlewares";
import pool from "../db/postgres";

export const getAllCompanies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seeker_id } = req.params;
    if (!seeker_id) next(new Error("Invalid seeker"));
    const companies = await pool.query(
      "SELECT * FROM company JOIN schedule ON company.company_id = schedule.company_id JOIN seeker ON schedule.seeker_id = seeker.seeker_id WHERE seeker.seeker_id = $1",
      [seeker_id]
    );
    if (!companies) next(new Error("No company found"));
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
  }
);

export const createNewCompany = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      link,
      jobType,
      company_size,
      salary,
      location, // latlng
      description,
      status, // interest,applied,progress,rejected
      interest, // need to delete
    } = req.body;
    if (
      !name ||
      !link ||
      !jobType ||
      !company_size ||
      !salary ||
      !location ||
      !description ||
      !status ||
      !interest
    )
      next(new Error("Invalid input values"));
    const newCompany = await pool.query(
      "INSERT INTO company (name,link,jobType,company_size,salary,location,description,status,interest) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        name,
        link,
        jobType,
        company_size,
        salary,
        location,
        description,
        status,
        interest,
      ]
    );
    if (!newCompany) next(new Error("Failed to create company"));
    res.status(200).json({ msg: "Company successfully created", newCompany });
    next();
  }
);
