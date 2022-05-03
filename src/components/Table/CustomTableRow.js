import { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import avatarImage from "../../assets/avatar.jpg";

import { Avatar } from "@mui/material";

export default function CustomTableRow({
  children,
  row,
  cellsInTheRightOrder,
  handleDelete,
  path,
  index,
}) {
  const [rowValues, setRowValues] = useState({});

  useEffect(() => {
    setRowValues({ ...row });
  }, [row]);


  return (
    <TableRow>
      {children}
      {cellsInTheRightOrder.map((key) => {
        return (
          <>
            {key.type === "file" ?(
              // console.log(key.id)
              <TableCell>
                <Avatar
                padding="none"
                  src={key.id}
                  sx={{ width: 40, height: 40 , marginLeft:-2}}
                  aria-label="recipe"
                  component={Link}
                  to={path + row._id}
                  key={key.id}
                  id={key.id}
                >
                  <img style={{ width: "inherit" }} src={avatarImage} />
                </Avatar>
              </TableCell>
            ):

            <TableCell
              padding="none"
              key={key.id}
              id={key.id}
              style={{ textDecoration: "none" }}
              component={Link}
              to={path + row._id}
            >
              {rowValues[key.id]}
            </TableCell>
      }



          </>
        );
      })}
      <TableCell padding="none">
        <IconButton
          component={Link}
          to={path + "edit/" + row._id}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
