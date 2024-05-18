import { join } from 'path'; // Es de Node
import { existsSync } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class FilesService {

    getStaticProductImage(imageName: string) {
        const imagePath = join(__dirname, '..', '..', 'static', 'products', imageName);

        if(!existsSync(imagePath))
            throw new NotFoundException(`Image with name '${ imageName }' not found`);

        return imagePath;
    }
}
