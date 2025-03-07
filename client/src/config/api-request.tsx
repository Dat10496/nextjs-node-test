"use server";
import { BASE_API } from "@/config";
import apiService from "@/config/api-service";

export const getLead = async () => {
  try {
    const res = await fetch(`${BASE_API}/leads`, {
      next: { revalidate: 0 },
    });

    const result = await res.json();

    if (result.success) {
      return result.data;
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
