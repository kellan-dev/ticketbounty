import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Props = {
  className?: string;
  title: string;
  description: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
};

export default function CardCompact({
  className,
  title,
  description,
  content,
  footer,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
