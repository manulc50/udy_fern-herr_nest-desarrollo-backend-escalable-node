import { v4 as uuid } from 'uuid';
import { Brand } from '../../brands/entities/brand.entity';

const time: number = new Date().getTime();

export const BRANDS_SEED: Brand[] = [
    {
        id: uuid(),
        name: 'volvo',
        createdAt: time
    },
    {
        id: uuid(),
        name: 'toyota',
        createdAt: time
    },
    {
        id: uuid(),
        name: 'honda',
        createdAt: time
    },
    {
        id: uuid(),
        name: 'jeep',
        createdAt: time
    },
    {
        id: uuid(),
        name: 'tesla',
        createdAt: time
    }
];