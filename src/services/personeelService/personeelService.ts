import Person from '@/classes/Person';
import http from '@/services/http';

export default class PersoneelService {

   public async getAll(): Promise<Array<Person>> {
      const response = await http.get(`/api/persons`);
      return response.data;
   }

   public async get(id: string): Promise<Person> {
      if(!id) {
        throw new Error("");
      }
      const response =  await http.get(`/api/persons/${id}`);
      return response.data;
   }
}

// A singleton instance
export const personeelService = new PersoneelService();