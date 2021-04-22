import Person from '@/classes/Person';
import data from "@/data/person_mock";

export default class PersoneelService {

   public getAll(): Array<Person> {
      return data;
   }

   public get(id): Person {
      var result = data.find(person => person.Id == id);
      if(result != null){
        return result;
      }
      return (null as unknown) as Person;
   }
}

// A singleton instance
export const personeelService = new PersoneelService();