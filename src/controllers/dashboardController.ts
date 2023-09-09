import { NextFunction, Request, Response } from 'express';
import prismaClient from '../utils/databaseConnector';
import prismaOperation from '../utils/helperFunctions';

const getDetailedBalance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await prismaOperation(
    () => prismaClient.$queryRaw`
      Select single_category.id AS categoryId,single_category.name AS categoryName,in_only AS inOnly,level AS categoryLevel,
      single_category.parent_id AS parentId,breakdown, (categoryTotal + carryover) AS totalBalance FROM 
      (Select id,name,level,in_only,parent_id,carryover FROM Category) AS single_category
      left join 
      (Select category_id, sum(total_amount) AS categoryTotal,
        group_concat(status_type,'_', payment_container_name,'_',total_amount) AS breakdown FROM 
      (SELECT c.id AS category_id,c.name AS category_name,c.parent_id AS parent_id,c.level AS category_level,
        SUM(t.amount) AS total_amount,pc.name AS payment_container_name,st.name AS status_type
      FROM Transaction t
      LEFT JOIN
      Category c ON t.current_category_id = c.id
      LEFT JOIN
      PaymentContainer pc ON t.current_container_id = pc.id 
      LEFT JOIN
      Status st ON t.statusId = st.id
      GROUP BY c.name,  pc.name,st.name,c.level) AS main
      Left  JOIN
      ( Select id,name,parent_id FROM Category ) AS relation_category 
      ON main.parent_id=relation_category.id GROUP BY category_name ) AS group_category
      ON group_category.category_id=single_category.id
      ORDER BY level DESC`,
    res,
    next,
  );

  req.body = result;
  next();
};

export default getDetailedBalance;
