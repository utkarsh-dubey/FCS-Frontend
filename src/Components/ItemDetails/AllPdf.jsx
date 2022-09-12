import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Modal,
  Box,
  Table,
  TablePagination,
} from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
const style = {
  // position: 'absolute',
  top: "50%",
  left: "50%",
  // transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "2px solid #000",
  border: "2px solid #000",
  boxShadow: 100,
  p: 4,
};
const AllPdf = () => {
  const [mainData, setMainData] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`https://54.85.12.94:7000/pdf/all/${userId}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}}).then((res) => {
      setMainData(res.data);
      // console.log(res.data);
    });
  }, []);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleApprove = (id) => {
    const userId = localStorage.getItem("userId");
    axios
      .post(`https://54.85.12.94:7000/admin/approve/${userId}?pdfId=${id}`,{},{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
      .then((res) => {
        // console.log(res.data);
      });
  };
  const handleReject = (id) => {
    const userId = localStorage.getItem("userId");
    axios
      .post(`https://54.85.12.94:7000/admin/reject/${userId}?pdfId=${id}`,{headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}`}})
      .then((res) => {
        // console.log(res.data);
      });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Download</TableCell>
                <TableCell>Approve Status</TableCell>
                <TableCell>Reject Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainData
                ? mainData
                    .slice(page * limit, page * limit + limit)
                    .map((proc) => (
                      <TableRow
                        hover
                        key={proc.id}
                        //   selected={selectedCustomerIds.indexOf(proc.id) !== -1}
                      >
                        <TableCell>{proc.name}</TableCell>

                        {/* <TableCell>
                          
                          {proc.quantity}
                        </TableCell>
                        <TableCell>
                        
                          {proc.price}
                        </TableCell>
                        <TableCell>
                          
                          {proc.commission}
                        </TableCell> */}
                        {/* <TableCell>
                    {getShipmentStatus(proc.shipment ? proc.shipment.shipped_on ?proc.shipment.shipped_on :'NA':'NA')}
                  </TableCell> */}
                        <TableCell>
                        <a href={proc.pdf} download>
                  <Button variant="contained" color="primary" >
                          Download
                  </Button></a>
                        </TableCell>

                        <TableCell>
                          {!proc.isRejected && (
                            <Button
                              variant="contained"
                              onClick={
                                !proc.isApproved
                                  ? () => handleApprove(proc._id)
                                  : ""
                              }
                              color="primary"
                            >
                              {proc.isApproved ? "Already Approved" : "Approve"}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          {!proc.isApproved && (
                            <Button
                              variant="contained"
                              onClick={
                                !proc.isApproved
                                  ? () => handleReject(proc._id)
                                  : ""
                              }
                              color="primary"
                            >
                              {proc.isRejected ? "Already Rejected" : "Reject"}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                : ""}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={mainData ? mainData.length : ""}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default AllPdf;
