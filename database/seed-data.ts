interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}

export const seedData : SeedData = {
    entries: [
        {
            description: 'Pendiente: Hola que tal tal tal tal',
            status: 'pending',
            createdAt: Date.now() 
        },
        {
            description: 'En progreso: Hola que tal tal tal tal',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finalizado: Hola que tal tal tal tal',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}