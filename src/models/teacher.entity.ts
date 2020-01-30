import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn, getManager, Repository } from "typeorm";
import { Length, Min } from "class-validator";

import { IHuman } from "types/interfaces";

import Discipline from "./discipline.entity";
import Lesson from "./lesson.entity";
import School from "./school.entity";

@Entity()
export default class Teacher implements IHuman {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Length(4, 16)
   @Column()
   firstName: string;
   @Length(3, 16)
   @Column()
   secondName: string;

   @Min(21)
   @Column()
   age: number;

   @ManyToMany(type => Discipline, { onDelete: "CASCADE" })
   @JoinTable()
   disciplines: Discipline[];

   @OneToMany(
      () => Lesson,
      less => less.teacher,
      { onDelete: "CASCADE" },
   )
   lessons: Lesson[];

   @ManyToOne(
      () => School,
      school => school.teachers,
   )
   @JoinColumn()
   school: School;

   public async isMatchDiscipline(discipline: Discipline): Promise<Boolean> {
      const teacherRepository = getManager().getRepository(Teacher);
      const teacherWithDisciplines = await teacherRepository.findOne({ where: { id: this.id }, relations: ["disciplines"] });
      const isMatch = teacherWithDisciplines.disciplines.filter(item => item.id === discipline.id).length > 0;
      return isMatch;
   }
}
