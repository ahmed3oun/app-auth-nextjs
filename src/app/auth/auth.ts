'use server';
import { db } from "@/drizzle/db";
import { SignupFormState, SignupFormSchema, LoginFormSchema, SigninFormState } from "./defenitions";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema";
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from "./stateless-session";

export const signup = async (state: SignupFormState, formData: FormData): Promise<SignupFormState> => {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedFields.success)
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }

    const { name, email, password } = validatedFields.data;

    console.log({
        name,
        email,
        password
    });

    const existedUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if (existedUser) {
        return {
            message: "Email already exists, please use different email."
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const data = await db.insert(users)
        .values({
            name,
            email,
            password: hashedPassword
        })
        .returning({
            id: users.id
        })
    const user = data[0];

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        };
    }

    const userId = user.id.toString();
    createSession(userId);
};

export async function signin(
    state: SigninFormState,
    formData: FormData,
  ): Promise<SigninFormState> {
    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const errorMessage = { message: 'Invalid login credentials.' };
  
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    // 2. Query the database for the user with the given email
    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedFields.data.email),
    });
  
    // If user is not found, return early
    if (!user) {
      return errorMessage;
    }
    // 3. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      validatedFields.data.password,
      user.password,
    );
  
    // If the password does not match, return early
    if (!passwordMatch) {
      return errorMessage;
    }
  
    // 4. If login successful, create a session for the user and redirect
    const userId = user.id.toString();
    await createSession(userId);
  }
  
  export async function logout() {
    deleteSession();
  }