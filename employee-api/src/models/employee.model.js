const { v4: uuidv4 } = require("uuid");

let prisma;
try {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
} catch (err) {
  console.error("Prisma client initialization failed. Run `npx prisma generate` to generate the client. Error:", err && err.message);
  // Fallback stub to avoid app crash; operations will throw a clear error when used.
  const notGeneratedError = () => { throw new Error("Prisma client is not generated. Run `npx prisma generate`."); };
  prisma = {
    employee: {
      create: async () => notGeneratedError(),
      findMany: async () => notGeneratedError(),
      findUnique: async () => notGeneratedError(),
      update: async () => notGeneratedError(),
    },
  };
}

class EmployeeModel {
  static async createEmployee(data) {
    try {
      const employee = await prisma.employee.create({
        data: {
          employeeId: `EMP-${Date.now()}-${uuidv4().slice(0, 8)}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          dateOfBirth: new Date(data.dateOfBirth),
          age: this.calculateAge(new Date(data.dateOfBirth)),
          salary: parseFloat(data.salary),
          post: data.post,
          country: data.country,
          city: data.city,
          dateOfHiring: new Date(data.dateOfHiring),
        },
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  static async getAllEmployees() {
    try {
      return await prisma.employee.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getEmployeeById(id) {
    try {
      return await prisma.employee.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateEmployee(id, data) {
    try {
      return await prisma.employee.update({
        where: { id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          salary: data.salary ? parseFloat(data.salary) : undefined,
          post: data.post,
          country: data.country,
          city: data.city,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteEmployee(id) {
    try {
      return await prisma.employee.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      throw error;
    }
  }

  static async searchEmployees(query) {
    try {
      return await prisma.employee.findMany({
        where: {
          isActive: true,
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { post: { contains: query, mode: "insensitive" } },
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static calculateAge(dateOfBirth) {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }
    
    return age;
  }
}

module.exports = EmployeeModel;