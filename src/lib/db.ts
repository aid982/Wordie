import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const createAcceleratedPrismaClient = () => {
	return new PrismaClient({
		/*log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error'],*/
				log:[ 'error', 'warn']
				
	}).$extends(withAccelerate());
};


declare global {
  var prisma: ReturnType<typeof createAcceleratedPrismaClient> | undefined
}

export const db = globalThis.prisma || createAcceleratedPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

