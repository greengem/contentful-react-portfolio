"use client";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import React from "react";

type SkillsCardProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  technologies: string[];
  animation: string;
};

const SkillCard: React.FC<SkillsCardProps> = ({ title, icon, description, technologies, animation }) => {
  return (
    <AnimationOnScroll animateIn={animation}>
    <Card shadow="none" className="p-4 shadow-lg">
      <CardHeader className="text-xl">
        {icon} {title}
      </CardHeader>
      <CardBody className="text-default-700 tracking-tight card-body relative">
        <p>{description}</p>
        <div className="flex flex-wrap mt-6 gap-1">
          {technologies.map((tech: string, index: number) => (
            <Chip size="sm" key={index} color="secondary" variant='bordered'>
              {tech}
            </Chip>
          ))}
        </div>
      </CardBody>
    </Card>
    </AnimationOnScroll>
  );
};

export default SkillCard;
