"use server";
import apiService from "@/config/api-service";

export const getLead = async () => {
  try {
    const result = await apiService.get("/leads");

    if (result.data.success) {
      return result.data.data;
    }
  } catch (error) {
    console.log("Get lead error", error);
  }
};

export const createLead = async (props: {
  name: string;
  email: string;
  status: string;
}) => {
  try {
    const { name, email, status } = props;
    const result = await apiService.post("/leads", { name, email, status });

    if (result.data.success) {
      return result.data;
    }
  } catch (error) {
    console.log("Create lead error", error);
    return error;
  }
};
